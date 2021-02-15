import React, { FunctionComponent, useState, useEffect, Fragment } from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import ChatInputComponent from "../ChatInput/ChatInput.component";
import "./ChatsList.component.css";
import { useMsgNotification } from "../../Contexts/messageNotification.context";
import { isObjectWithValue } from "../../Utils/object";
import { sortMessagesDesc, sortChatsDesc } from "../../Utils/array";

type Props = {
  firebase: Firebase;
  targetID?: { [key: string]: string } | null;
};

const ChatsListComponent: FunctionComponent<Props> = ({
  firebase,
  targetID
}) => {
  // QueryDocumentSnapshot
  const [state, setState] = useState<[]>();
  const { user } = useUser();
  const { msg } = useMsgNotification();
  const [isFlashed, setIsFlashed] = useState<boolean>(false);

  useEffect(() => {
    getChats(false)
    // return () => unsubscribe()
  }, [user, msg]);

  const getChats = (initial = true): any => {
    let unsubscribe: any = undefined;
    if (user?.uid) {
      unsubscribe = firebase!
        .getChats()
        .where("members", "array-contains", user.uid)
        .get()
        .then((res: firebase.firestore.DocumentData) => {
          const sortedRes = res?.docs?.sort(sortChatsDesc);
          setState((prevState: any): any => {
            const lastChat = sortedRes[0];
            if (prevState?.length < sortedRes?.length) {
              setIsFlashed(true);
              const newState = [lastChat, ...prevState]; 
              return newState;
            } else {
              setState(sortedRes);
            }
          });

        });
    }
  }

  return (
    <div className='container'>
      {!state?.length && <p>no chats</p>}
      {state?.map(
        (item: firebase.firestore.QueryDocumentSnapshot, index: number) => {
          const messages = isObjectWithValue(item.data(), 'messages') ? item.data().messages.sort(sortMessagesDesc) : undefined;
          const existingChatID: string = item.id;
          const targetUserID = () =>
            item.data().members.find((id: string) => id !== user.uid);
          return (
            <div key={`${index}${targetID}`}>{messages ?
              <details className="container" open={(isFlashed && index === 0) ? true : false} >
                {index}
                <summary className={isFlashed && index === 0 ? 'isFlashed' : ''} onClick={()=> (isFlashed && index === 0) && setIsFlashed(false)}>
                  {messages[0]?.toName ? messages[0]?.toName : 'Mystery user' },
                {new Date(messages[0].timestamp).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  })}
                </summary>
                {messages.map(
                  (
                    item: {
                      message: string;
                      timestamp: number;
                      fromName: string;
                      fromID: string;
                    },
                    index: number
                  ) => (
                      <div className={item.fromID === user.uid ? 'messageBoxFrom' : 'messageBoxTo'} key={`${index}`}>
                        <strong> From: {item.fromName}</strong> <p>{item.message}</p>
                      </div>
                    )
                )}
                <ChatInputComponent
                  firebase={firebase}
                  routeProps={{ targetUserID: targetUserID(), existingChatID, targetUsername: messages[0]?.toName }}
                />
              </details> : <p>There may have been a chat here that got corrupted.</p>}
            </div>
          );
        }
      )}
    </div>
  );
};

export default ChatsListComponent;
