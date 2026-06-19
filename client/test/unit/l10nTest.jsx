/** @jest-environment jsdom */
/* eslint react/prop-types: 0 */
import React, { useContext, useEffect } from 'react';
import { render, screen } from '@testing-library/react'

import { L10nContext, WithL10n } from '../../src/services/l10n';

test('WithL10n can mount', () => {
  render(
    <WithL10n>
      <div className="inner" />
    </WithL10n>
  );
  expect(document.getElementsByClassName('inner')[0]).toBeDefined();
});

test('WithL10n : setLanguage', () => {
  const InnerComponent = ({ customLanguage }) => {
    const { t, setLanguage } = useContext(L10nContext);
    useEffect(() => {
      if (customLanguage) {
        setLanguage(customLanguage);
      }
    }, [customLanguage]);
    return <div className="inner">{t('room')}</div>;
  };

  const { rerender } = render(
    <WithL10n>
      <InnerComponent />
    </WithL10n>
  );
  expect(document.getElementsByClassName('inner')[0].textContent).toEqual('Room');

  // update with customLanguage property set to "de"
  rerender(
    <WithL10n>
      <InnerComponent customLanguage="de" />
    </WithL10n>
  );
  expect(document.getElementsByClassName('inner')[0].textContent).toEqual('Raum');
});
