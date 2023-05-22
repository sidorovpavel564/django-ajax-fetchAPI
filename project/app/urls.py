from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('management', views.manager, name='management'),
    path('product/', views.product, name='product'),
    path('put_delete_product/<int:product_id>',
         views.put_delete_product, name='put_delete_product'),
]
