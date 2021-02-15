import React, { useState, useContext, useEffect } from "react";
import Firebase from "../Firebase/firebase";
import { useAuth } from "./auth.context";

type MsgNotificationConsumer = {
  msg: firebase.firestore.DocumentData;
  setMsg: (value: firebase.firestore.DocumentData | any) => any;
};

const MsgNotificationContext = React.createContext<MsgNotificationConsumer>(
  {} as MsgNotificationConsumer
);

type Props = {
  children: React.ReactNode;
  firebase: Firebase;
};

const  createFnCounter = (fn:any, invokeBeforeExecution:boolean) =>  {
    let count:any = 0;
    return (args:any) => {
      count++;
      if (count <= invokeBeforeExecution) {
        return true;
      } else {
        return fn(args, count);
      }
    };
  }

const handleActivitySubscription = (snapshot:any, counter:any) => {
    const initialLoad = counter === 1;
    
}

export const MsgNotificationProvider = ({ ...props }: Props) => {
  const {
    auth: { user }
  } = useAuth();
  const [msg, setMsg] = useState<MsgNotificationConsumer>(
    {} as MsgNotificationConsumer
  );

  useEffect(() => {
    let unsubscribe: any = undefined;
    if (user?.uid) {
      unsubscribe = props
        .firebase!.getChats()
        .where("members", "array-contains", user.uid)
        .where('last_updated', '>' , +new Date()) 
        .onSnapshot((res: any) => {
        res
        .docChanges()
        .forEach(({ doc }: firebase.firestore.DocumentData) => {
            if(doc?.data().hasOwnProperty('messages')){
                setMsg(doc);
            }
        });
    });
}
// res.size  ?
//docs arra , take last ?

    return () => unsubscribe;
  }, [user]);

  return <MsgNotificationContext.Provider value={{ msg, setMsg }} {...props} />;
};

const { Consumer: MsgNotificationConsumer } = MsgNotificationContext;

export const useMsgNotification = () => {
  const context = useContext(MsgNotificationContext);
  if (context === undefined) {
    throw new Error("must use in UserProvider");
  }
  return context;
};
