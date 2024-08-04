import { SimpleForm, TextInput, required, Edit } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='id' validate={[required()]} label="Id" />
        <TextInput source='title' validate={[required()]} label="Title" />
        <TextInput source='imageSrc' label="Image Source" />
      </SimpleForm>
    </Edit>
  );
};
