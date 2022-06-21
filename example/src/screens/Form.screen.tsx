import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Form, SwitchListItem, Text, TextInput } from 'react-native-ama';

import { CTAPressable } from '../components/CTAPressable';
import { Spacer } from '../components/Spacer';
import { theme } from '../theme';

export const FormScreen = () => {
  const [emailAddress, setEmailAddress] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [testKeyboardTrap, setTestKeyboardTrap] = React.useState(false);
  const [invalidFields, setInvalidFields] = React.useState<{
    lastName: boolean;
    firstName: boolean;
  }>({ firstName: false, lastName: false });

  const toggleSwitch = () =>
    setTestKeyboardTrap(previousState => !previousState);

  const lastNameRef = React.useRef(null);

  const handleOnSubmit = () => {
    setInvalidFields({
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
    });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <ScrollView style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={newText => setFirstName(newText)}
          defaultValue={firstName}
          label={
            <>
              <Text style={styles.label}>First name:</Text>
            </>
          }
          hasValidation={true}
          error={<Text>The first name cannot be blank</Text>}
          hasError={invalidFields.firstName}
        />

        <Spacer height="normal" />
        <SwitchListItem
          label={
            <Text style={styles.switchText}>
              Test keyboard trap on next field
            </Text>
          }
          style={styles.switchListItem}
          value={testKeyboardTrap}
          onValueChange={toggleSwitch}
        />
        {testKeyboardTrap ? (
          <>
            <Text>
              Note: The following field causes the app to crash when pressing
              the "next" button on the keyboard
            </Text>
            <Spacer height="normal" />
          </>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder=""
          defaultValue={lastName}
          label={<Text style={styles.label}>Last name:</Text>}
          onChangeText={newText => setLastName(newText)}
          hasValidation={true}
          error={<Text>The thing cannot be null</Text>}
          hasError={invalidFields.lastName}
          ref={lastNameRef}
          onBlur={() => {
            // @ts-ignore
            testKeyboardTrap && lastNameRef.current?.focus();
          }}
        />

        <Spacer height="normal" />

        <TextInput
          style={styles.input}
          placeholder=""
          defaultValue={emailAddress}
          label={<Text style={styles.label}>Email address:</Text>}
          onChangeText={newText => setEmailAddress(newText)}
          hasValidation={false}
        />
        <Spacer height="big" />
        <CTAPressable title="Submit" onPress={handleOnSubmit} />
      </ScrollView>
    </Form>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: theme.padding.big,
    paddingVertical: theme.padding.big,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    paddingBottom: theme.padding.small,
  },
  switchText: {
    paddingRight: theme.padding.normal,
    flex: 1,
  },
  switchListItem: {
    marginVertical: theme.padding.normal,
  },
});
