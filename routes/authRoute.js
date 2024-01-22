const express = require('express');
const router = express.Router();
const { emptyCart, getUserCart, userCart, getWishlist, createUser, loginAdmin, loginUser, getAllUsers, getaUser, deleteaUser, updateaUser, blockUser, unblockUser, handleRefreshToken, 
    logout, updatePassword, forgotPasswordToken, resetPassword, createOrder, getOrders, getAllOrders, getOrderByUserId, updateOrderStatus, applyCoupon } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUser);
router.post('/login-admin', loginAdmin);
router.post('/cart',authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.get('/all-users', getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/wishlist',authMiddleware, getWishlist);
router.get('/cart', authMiddleware, getUserCart);

router.get('/:id', authMiddleware,isAdmin, getaUser);
router.delete('/empty-cart', authMiddleware, emptyCart);

router.delete('/:id', deleteaUser);
router.put('/edit-user',authMiddleware, updateaUser);
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware, isAdmin, unblockUser);


module.exports = router;