import React from 'react';
import {
  onAuthStateChanged,
  getAuth,
  User,
} from 'firebase/auth';
import firebase_app from '@/app/firebase/config';
import LogoutButton from '@/app/components/LogoutButton';

const auth = firebase_app ? getAuth(firebase_app) : undefined;

export const AuthContext = React.createContext({});

export const useAuthContext: () => any = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: any) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user &&
        `Hello ${user.email}`
      }
      {loading ? <div>Loading...</div> : children}
      {user &&
        <LogoutButton
          auth={auth}
        />
      }
    </AuthContext.Provider>
  );
};