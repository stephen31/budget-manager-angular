import mongoose from 'mongoose';

const Category = mongoose.model('Category');
const Account = mongoose.model('Account');

/**
 * Category controller
 */
/////////////////////////////////////////////////////

/**
 * Create category
 */
export const create = async (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.budget) {
    return res.status(409).json({
      message: 'One field is missing'
    })
  }

  try {
    const category = new Category(req.body);
    category.user = req.user_details;
    await category.save();

    req.user_account.categories.push(category);
    await req.user_account.save();

    res.status(201).json({
      message: 'Category created succesfully',
      category: {
        id: category._id,
        name: category.name,
        iconName: category.iconName,
        budget: category.budget,
        transactions: category.transactions
      }
    });
  } catch (error) {
    next(error);
  }
}
////////////////////////////////////////////////////////////////////
/**
 * Read Category
 */
export const read = async (req, res, next) => {
  try {
    if (req.authenticated_user.id.toString() !== req.category.user._id.toString()) {
      return res.status(409).json({
        message: 'Not Authorized'
      })
    }

    const filledCategory = await Category.findById(req.category._id).populate('transactions').exec();
    if(!filledCategory) {
      return res.status(404).json({message: 'Category not found'});
    }

    return res.status(200).json(filledCategory);
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////
/**
 * remove Category
 */

export const remove = async (req, res, next) => {
  try {
    if (req.authenticated_user.id.toString() !== req.category.user._id.toString()) {
      return res.status(409).json({
        message: 'Not Authorized'
      })
    }
    req.user_account.categories.remove(req.category);
    await req.user_account.save();
    const deletedCategory = await Category.findByIdAndRemove(req.category._id).exec();

    res.status(200).json({
      message: 'Category deleted successfully',
      category: deletedCategory
    });
  } catch (error) {
    next(error);
  }
}
////////////////////////////////////////////////////////////////////
/**
 * update Category
 */

export const update = async (req, res, next) => {
  try {
    if (req.authenticated_user.id.toString() !== req.category.user._id.toString()) {
      return res.status(401).json({
        message: 'Not Authorized'
      })
    }
    const updatedCategory = await Category.findOneAndUpdate({
      _id: req.category._id
    }, req.body, {
      new: true
    }).populate('transactions').exec();

    if (!updatedCategory) {
      return res.status(409).json({
        message: 'Error during category update'
      })
    }
    req.category = updatedCategory;
    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    next(error);
  }
}


////////////////////////////////////////////////////////////////////
/**
 * list all Categories of an account
 */

export const listAllCatecogoriesOfAccount = async (req, res, next) => {
  try {
    const categories = await Account.findById(req.user_account._id).populate({path: 'categories', populate: {path: 'transactions'}}).exec();
    if (!categories) {
      return res.status(404).json({
        message: 'Categories not found'
      })
    }
    res.status(200).json({
      message: 'Categories retrieved successfully',
      categories: categories.categories
    })
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////
/**
 * Preload category object 
 */
export const categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id).populate('user', '_id username').exec();
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      })
    }
    req.category = category;
    next();
  } catch (error) {
    next(error);
  }
}