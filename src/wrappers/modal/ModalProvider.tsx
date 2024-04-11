import React, { FunctionComponent, Suspense, useEffect } from 'react';
import { createContext, useState } from 'react';
import { noop, Subject } from 'rxjs';
import { useSubscription } from 'observable-hooks';
import { useLocation } from 'react-router';


type Builder = (close: () => void) => JSX.Element
type ModalContext = (builder: Builder) => void

export const modalContext = createContext<ModalContext>(() => noop);

const modals$$ = new Subject<Builder>();

interface Props{
  children: React.ReactNode
}
const ModalProvider: FunctionComponent<Props> = (props) => {
  const [currentModal, setCurrentModal] = useState<JSX.Element>(<></>);
  const close = (() => setCurrentModal(<></>));
  const location = useLocation();
  const context = (creator: Builder) => setCurrentModal(creator(close));

  useSubscription(modals$$, context);

  useEffect(()=> {
    setCurrentModal(<></>);
  },[location]);

  return <modalContext.Provider value={context}>
    {props.children}
    <Suspense fallback={<div></div>}>
      {currentModal}
    </Suspense>
  </modalContext.Provider>;
};

export const showModal = (builder: Builder): void => modals$$.next(builder);

export default ModalProvider;