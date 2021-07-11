import { getCategories, getProducts } from "../../API/API";
import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard";
import uniqid from "uniqid";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const AdminProductos = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const productForm = () => {
    setShowProductForm(!showProductForm);
  };

  const nameHandler = (e) => {
    setProductName(e.target.value);
  };

  const categoryHandler = (e) => {
    setProductCategory(e.target.value);
  };

  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
      setCategories(await getCategories());
    })();
  }, []);
  return (
    <div className="mt-5 mx-2">
      <div className="col-md-6 mx-auto">
        {!showProductForm ? (
          <div className="text-center mb-2">
            <Button className="bg-primary" onClick={productForm}>
              Agregar producto nuevo
            </Button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-2">
              <Button className="bg-primary" onClick={productForm}>
                Ocultar
              </Button>
            </div>
            <Form>
              <FormGroup>
                <Label>Agregar nuevo producto</Label>
                <Input
                  name="productName"
                  value={productName}
                  placeholder="Nombre del producto"
                  onChange={nameHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label>Categoria</Label>
                <Input
                  type="select"
                  name="category"
                  value={productCategory}
                  onChange={categoryHandler}
                >
                  {categories.map((cat) => {
                    return (
                      <option id={cat._id} key={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup className="text-center mt-3">
                <Button
                  onClick={() => {
                    console.log(productName, productCategory);
                  }}
                >
                  Agregar
                </Button>
              </FormGroup>
            </Form>
          </div>
        )}
      </div>
      <div>
        {products
          ? products.map((product) => {
              return <ProductCard key={uniqid()} />;
            })
          : null}
      </div>
    </div>
  );
};
