import React, { FunctionComponent, Fragment, useEffect } from 'react';
import { useMsgNotification } from '../../Contexts/messageNotification.context';
import { Link } from '@reach/router';
import * as ROUTES from '../../Constants/routes';
import { useUser } from '../../Contexts/user.context';

const NotificationComponent: FunctionComponent = () => {
  const { msg } = useMsgNotification();
  const { user } = useUser();

  const lastMessage = msg?.exists ? msg?.data().messages[msg?.data().messages.length - 1] : undefined;
  const lastMessageSenderId = lastMessage?.fromID;
  const fromMe = lastMessageSenderId === user.uid ? true : false;

  return (
    <Fragment>
      {lastMessage && !fromMe ? (
        <Fragment>
          <span>
            Latest message: <strong>{lastMessage.message}</strong>{' '}
          </span>
          <Link to={ROUTES.SINGLE_CHAT} state={{ targetChatID: msg.id }}>
            Go to chat
          </Link>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default NotificationComponent;
