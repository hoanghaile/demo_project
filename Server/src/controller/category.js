import { Category } from "../models/Category.js";

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find({ category: req.categoryId });
    console.log("hello world!");
    res.status(200).json({ success: true, category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "false" });
  try {
    const newCategory = new Category({
      name,
    });
    await newCategory.save();

    res.json({ success: true, message: "tao thanh cong! ", post: newCategory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCateId = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const data = await Category.findOne(id);
    return res.status(200).json({ success: true, category: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    let updateCategory = {
      name,
    };
    const categoryUpdate = { _id: req.params.id, category: req.categoryId };
    updateCategory = await Category.findOneAndUpdate(
      categoryUpdate,
      updateCategory,
      { new: true }
    );
    // if (!updateCategory)
    //     return res.status(401).json({ success: false, message: 'post false' })
    // return res.json({success: true , message: 'thanh cong', category: updateCategory})
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = { _id: req.params.id, category: req.categoryId };
    const categoryDelete = await Category.findOneAndDelete(deleteCategory);
    // if (!categoryDelete)
    //     return res.status(401).json({ success: false, message: 'xoa hong thanh cong' })
    return res.json({ success: true, category: categoryDelete });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
