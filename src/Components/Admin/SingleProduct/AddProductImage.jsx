import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useEffect, useState } from "react";

export const AddProductImage = (props) => {
  return (
    <Form>
      <FormGroup className="my-2">
        <Label className="d-block">Add new image</Label>
        <Input type="file" />
      </FormGroup>
    </Form>
  );
};
