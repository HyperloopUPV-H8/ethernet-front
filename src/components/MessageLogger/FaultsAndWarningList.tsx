import React, { useEffect, useState } from "react";
import { ConsoleList } from "@components/MessageLogger/ConsoleList";
import {
  warningMessages,
  faultMessages,
} from "@components/MessageLogger/messagesMock";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "@adapters/Message";
import { initializeMockMessages } from "@slices/messagesSlice";

export const FaultsAndWarningList = () => {
  //this state is for the static mocks
  //const [WarningList, setWarningList] = useState<Message[]>(warningMessages);
  //const [FaultList, setFaultList] = useState<Message[]>(faultMessages);

  const messages = useSelector((state: RootState) => state.messages);

  //with useEffect it doesn't work correctly (and with StrictMode)
  //mockMessages();

  return (
    <>
      <ConsoleList title={"WARNINGS"} messages={messages.warning} />
      <ConsoleList title={"FAULTS"} messages={messages.fault} />
    </>
  );
};

//mocks with dispatch
const mockMessages = (): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    //FIXME: At the begin it has nothing. It works but it is not represented until it rerenders a second time
    let msgs = { fault: faultMessages, warning: warningMessages };
    dispatch(initializeMockMessages(msgs));
  }, []);
};