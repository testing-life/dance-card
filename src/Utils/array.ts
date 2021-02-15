export const sortMessagesDesc = (a:any, b:any) => b.timestamp - a.timestamp; 
export const sortChatsDesc = (a:any, b:any) => b.data().last_updated - a.data().last_updated; 