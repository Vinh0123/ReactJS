import React, { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState({
    name: "",
    category: "Nam",
    code: "",
    imageBase64: "",
    price: "",
    oldPrice: "",
  });
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, imageBase64: reader.result }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    alert("Lưu sản phẩm thành công!");
    setProduct({
      name: "",
      category: "Nam",
      code: "",
      imageBase64: "",
      price: "",
      oldPrice: "",
    });
  };

  const handleShow = () => {
    setShowProducts(!showProducts);
  };

  const renderProductsByCategory = (category) => {
    return products
      .filter((p) => p.category === category)
      .map((product, index) => (
        <div key={index} style={styles.card}>
          {product.imageBase64 && (
            <img
              src={product.imageBase64}
              alt={product.name}
              style={styles.image}
            />
          )}
          <div style={styles.cardBody}>
            <div style={styles.productName}>{product.name}</div>
            <div style={styles.productCode}>{product.code}</div>
            <div style={styles.productPrice}>{product.price} đ</div>
            {product.oldPrice && (
              <div style={styles.productOldPrice}>{product.oldPrice} đ</div>
            )}
            <button style={styles.buyButton}>Đặt mua</button>
          </div>
        </div>
      ));
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "100%",
    },
    form: {
      background: "#f8f9fa",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      width: "400px",
      marginBottom: "40px",
      textAlign: "left",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    input: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginTop: "5px",
      width: "100%",
    },
    saveButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
    },
    showButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    sectionTitle: {
      margin: "30px 0 15px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#343a40",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    },
    card: {
      width: "220px",
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
      textAlign: "center",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.3s",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    cardBody: {
      flexGrow: 1,
    },
    productName: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "#343a40",
    },
    productCode: {
      fontSize: "12px",
      color: "#6c757d",
      marginBottom: "10px",
    },
    productPrice: {
      color: "#dc3545",
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    productOldPrice: {
      fontSize: "14px",
      color: "#6c757d",
      textDecoration: "line-through",
      marginBottom: "15px",
    },
    buyButton: {
      backgroundColor: "#ffc107",
      border: "none",
      padding: "8px",
      borderRadius: "5px",
      color: "#212529",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Category</label>
          <select
            style={styles.input}
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Code</label>
          <input
            style={styles.input}
            type="text"
            name="code"
            value={product.code}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Image</label>
          <input
            style={styles.input}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Price</label>
          <input
            style={styles.input}
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Old Price</label>
          <input
            style={styles.input}
            type="number"
            name="oldPrice"
            value={product.oldPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <button style={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button style={styles.showButton} onClick={handleShow}>
            Show
          </button>
        </div>
      </div>

      {showProducts && (
        <>
          <div style={styles.sectionTitle}>THỜI TRANG NAM</div>
          <div style={styles.cardContainer}>
            {renderProductsByCategory("Nam")}
          </div>

          <div style={styles.sectionTitle}>THỜI TRANG NỮ</div>
          <div style={styles.cardContainer}>
            {renderProductsByCategory("Nữ")}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
