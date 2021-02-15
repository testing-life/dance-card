import React, {
  FunctionComponent,
  useState,
  FormEvent,
  useEffect,
} from 'react';
import Firebase from '../../Firebase/firebase';
import { useUser } from '../../Contexts/user.context';
import { useProfile } from '../../Contexts/profile.context';
import { GeoDocumentReference } from 'geofirestore/dist/GeoDocumentReference';
import { Profile } from '../../Models/profile.models';
import { navigate } from '@reach/router';
import * as ROUTES from '../../Constants/routes';

type Props = {
  firebase: Firebase;
  routeProps: any;
};

const ChatInputComponent: FunctionComponent<Props> = ({ ...props }) => {
  const { firebase } = props;
  const { targetUserID, existingChatID, targetUsername } = props.routeProps;
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<Error>();
  const [isSending, setIsSending] = useState<boolean>();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );
  const { user } = useUser();
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    if (existingChatID) {
      setCurrentChatId(existingChatID);
    }
  }, []);

  const updateChatsIdInProfile = (chatID: string) => {
    if ((profile.chats as string[]).includes(chatID)) {
      return;
    }
    const chats: string[] = [...profile.chats, chatID];
    const newProfile = { ...profile, chats };
    //if target id === user.uid, cancel
    updateUsersChatIds(chatID, user.uid!)
      .then(() => setProfile(newProfile as Profile))
      .catch((e) => console.log(e));
    updateUsersChatIds(chatID, targetUserID).catch((e) => console.log(e));
  };

  const updateUsersChatIds = (chatID: string, userID: string): Promise<any> => {
    const document: GeoDocumentReference = firebase.getUsers().doc(userID);
    return document.update({ chats: firebase.fieldValue.arrayUnion(chatID) });
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    if (currentChatId) {
      firebase
        .getChats()
        .doc(currentChatId)
        .update({
          messages: firebase.fieldValue.arrayUnion({
            toName: targetUsername,
            fromName: profile.username,
            fromID: user.uid,
            message: message,
            timestamp: +new Date(),
          }),
          last_updated: +new Date(),
        })
        .then(() => {
          setIsSending(false);
        })
        .catch((e: Error) => setError(e));
      setMessage('');
    } else {
      firebase
        .getChats()
        .add({ members: [targetUserID, user.uid], last_updated: +new Date() })
        .then((refID) => {
          setCurrentChatId(refID.id);
          updateChatsIdInProfile(refID.id);
          refID
            .update({
              messages: firebase.fieldValue.arrayUnion({
                fromName: profile.username,
                toName: targetUsername,
                fromID: user.uid,
                message: message,
                timestamp: +new Date(),
              }),
            })
            .then(() => {
              setIsSending(false);
              navigate(ROUTES.CHATS);
            })
            .catch((e: Error) => setError(e));
        });
    }
    setMessage('');
  };

  return (
    <>
    {(targetUsername || targetUserID) && <form onSubmit={submitHandler} className="container">
      <input
        type="text"
        name="message"
        placeholder={
          !currentChatId
            ? `Your first message to ${targetUsername}`
            : 'Write message'
        }
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">{isSending ? 'sending...' : 'send'}</button>
      {error && (
        <p>Something went wrong with sending the message: {error.message}</p>
      )}
    </form>}
    </>
  );
};

export default ChatInputComponent;
