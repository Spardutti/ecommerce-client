import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCategories, newCategory } from "../../API/API";
import { useState, useEffect } from "react";

/* ADDS A NEW PRODUCT CATEGORY */

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
            value={categoryName}
            placeholder="enter category name"
            onChange={nameHandler}
          />
        </FormGroup>
        <FormGroup className="text-center mt-3">
          {loading ? (
            <div className="spinner-grow"></div>
          ) : (
            <Button
              className="bg-primary"
              onClick={async () => {
                setLoading(true);
                await newCategory(categoryName);
                setLoading(false);
                setShowCategoryForm(false);
              }}
            >
              Add category
            </Button>
          )}
        </FormGroup>
      </Form>
    </div>
  );
};
