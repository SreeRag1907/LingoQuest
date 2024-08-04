import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  BooleanInput,
} from "react-admin";

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct Option" />
        <ReferenceInput source="challengeId" reference="challenges">
          <SelectInput optionText="question" />
        </ReferenceInput>
        <TextInput source="imageSrc" label="Image Url" />
        <TextInput source="audioSrc" label="Audio Url" />
      </SimpleForm>
    </Create>
  );
};
