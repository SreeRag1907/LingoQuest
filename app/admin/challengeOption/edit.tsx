import {
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  BooleanInput,
  Edit,
} from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='text' validate={[required()]} label='Text' />
        <BooleanInput source='correct' label='Correct Option' />
        <ReferenceInput source='challengeId' reference='challenges' />
        <TextInput source='imageSrc' label='Image Url' />
        <TextInput source='audioSrc' label='Audio Url' />
      </SimpleForm>
    </Edit>
  );
};
