from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    
    path('upload/', views.uploadImage, name="image-upload"),
    path('uploadsecond/', views.uploadImageSecond, name="imagesecond-upload"),
    path('uploadthird/', views.uploadImageThird, name="imagethird-upload"),
    path('uploadfourth/', views.uploadImageFourth, name="imagefourth-upload"),
    path('uploadfifth/', views.uploadImageFifth, name="imagefifth-upload"),
    path('uploadsixth/', views.uploadImageSixth, name="imagesixth-upload"),
    path('uploadseventh/', views.uploadImageSeventh, name="imageseventh-upload"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name="top-products"),
    path('<str:pk>/', views.getProduct, name="product"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]