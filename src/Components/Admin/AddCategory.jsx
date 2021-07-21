import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCategories } from "../../API/API";
import { useState, useEffect } from "react";

export const AddCategory = () => {
  const [productCategory, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const nameHandler = (e) => {
    setCategoryName(e.target.value);
  };

  const toggleForm = () => setShowCategoryForm(!showCategoryForm);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  return !showCategoryForm ? (
    <div className="text-center mb-2">
      <Button className="bg-primary" onClick={toggleForm}>
        Add new category
      </Button>
    </div>
  ) : (
    <div className="text-center mb-2">
      <Button className="bg-primary" onClick={toggleForm}>
        Hide
      </Button>
      <Form>
        <FormGroup>
          <Label>Category name</Label>
          <Input
            name="productCategory"
            value={productCategory}
            placeholder="enter category name"
            onChange={nameHandler}
          />
        </FormGroup>
        <FormGroup className="text-center mt-3">
          <Button onClick={() => {}}>Add category</Button>
        </FormGroup>
      </Form>
    </div>
  );
};
