import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { observer } from "mobx-react-lite";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

const User = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtyFieldsSinceLastSubmit
      }) => (
        
        <Form onSubmit={handleSubmit}>
          <Header as='h2' content="Login" color="teal" textAlign='center'/>
          <Field name="email" component={TextInput} placeholder="Email"></Field>
          <Field name="password"  component={TextInput} type="password" placeholder="Password"></Field>

          {submitError && !dirtyFieldsSinceLastSubmit && (
            <Label color="red" basic content={submitError.statusText} />
          )}
          <Button
            disabled={invalid && !dirtyFieldsSinceLastSubmit }
            loading={submitting}
            positive
            content="Login"
          />
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    />
  );
};
export default observer(User);
