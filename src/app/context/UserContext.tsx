import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  email: string;
  userType: 'patient' | 'doctor';
  clinicalActive: boolean;
  onboardingComplete: boolean;
  profileComplete: boolean;
  selectedPlan?: string;
  planPrice?: number;
  couponCode?: string;
  discount?: number;
  // Onboarding data
  mainGoal?: string;
  lastPeriod?: string;
  waterGoal?: number;
  habits?: string[];
  // Gynecological profile
  cycleData?: {
    lastPeriod: string;
    cycleDuration: number;
    flowDuration: number;
    regular: boolean;
  };
  contraceptive?: {
    uses: boolean;
    type?: string;
    isPill?: boolean;
    pillName?: string;
    packType?: '21' | '24' | '28' | 'continuous';
    takesPause?: boolean;
    pauseDays?: number;
    skippedPills?: boolean;
  };
  pregnancy?: {
    possible: boolean;
    trying: boolean;
    history?: string;
  };
  intimateHealth?: {
    painDuringSex: boolean;
    discharge: boolean;
    burning: boolean;
    recurrentInfections: boolean;
  };
  medicalHistory?: {
    medications: string;
    allergies: string;
    surgeries: string;
  };
  // Daily tracking
  cycleProgress?: number;
  waterProgress?: number;
  routineProgress?: number;
  wellnessProgress?: number;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    userType: 'patient',
    clinicalActive: false,
    onboardingComplete: false,
    profileComplete: false,
    // Mock data for demo
    cycleProgress: 45,
    waterProgress: 60,
    routineProgress: 75,
    wellnessProgress: 80,
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const logout = () => {
    setUserData({
      name: '',
      email: '',
      userType: 'patient',
      clinicalActive: false,
      onboardingComplete: false,
      profileComplete: false,
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};