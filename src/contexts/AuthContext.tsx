import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      // In a real app, you would validate credentials against a backend
      
      // Check if user exists in localStorage (for demo purposes)
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          // Remove password before storing in state
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          
          // Store in localStorage
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<boolean> => {
    try {
      // Check if users array exists in localStorage
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
        phone,
        addresses: []
      };
      
      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log user in
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    
    const newAddress: Address = {
      ...address,
      id: Date.now().toString()
    };
    
    // If this is the first address or marked as default, set as default
    if (user.addresses.length === 0 || newAddress.isDefault) {
      // Set all other addresses to non-default
      user.addresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }
    
    const updatedUser = {
      ...user,
      addresses: [...user.addresses, newAddress]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in users array too
    updateUserInStorage(updatedUser);
  };

  const updateAddress = (updatedAddress: Address) => {
    if (!user) return;
    
    let addresses = [...user.addresses];
    
    // If setting as default, update all others
    if (updatedAddress.isDefault) {
      addresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === updatedAddress.id
      }));
    } else {
      // Find the address index
      const index = addresses.findIndex(addr => addr.id === updatedAddress.id);
      if (index !== -1) {
        addresses[index] = updatedAddress;
      }
    }
    
    const updatedUser = {
      ...user,
      addresses
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in users array too
    updateUserInStorage(updatedUser);
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    
    const addresses = user.addresses.filter(addr => addr.id !== id);
    
    // If we removed the default address and addresses still exist, make the first one default
    if (user.addresses.find(addr => addr.id === id)?.isDefault && addresses.length > 0) {
      addresses[0].isDefault = true;
    }
    
    const updatedUser = {
      ...user,
      addresses
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in users array too
    updateUserInStorage(updatedUser);
  };

  // Helper function to update user in the users array
  const updateUserInStorage = (updatedUser: User) => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const index = users.findIndex((u: any) => u.id === updatedUser.id);
      if (index !== -1) {
        // Preserve the password when updating
        const password = users[index].password;
        users[index] = { ...updatedUser, password };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      addAddress,
      updateAddress,
      removeAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};