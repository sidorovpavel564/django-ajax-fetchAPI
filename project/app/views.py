import json
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import get_object_or_404, render

from .models import Product
# from .forms import ProductForm


def index(request):
    # product_form = ProductForm(request.POST or None)
    # if request.method == "POST":
    #     if product_form.is_valid():
    #         product_form.save()
    context = {
        # 'product_form': product_form,
    }
    return render(request, 'app/index.html', context)


def manager(request):
    products = Product.objects.all()
    context = {
        'products': products,
    }
    return render(request, 'app/manager.html', context)


def product(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == "GET":
            products = list(Product.objects.all().values())
            return JsonResponse({'context': products})
        if request.method == "POST":
            data = json.load(request)
            product = data.get('payload')
            Product.objects.create(
                product_name=product['product_name'], quantity=product['quantity'])
            return JsonResponse({'status': 'Product added.'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')


def put_delete_product(request, product_id):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        product = get_object_or_404(Product, pk=product_id)

        if request.method == 'PUT':
            data = json.load(request)
            updated_values = data.get('payload')

            product.product_name = updated_values['product_name']
            product.quantity = updated_values['quantity']
            product.save()

            return JsonResponse({'status': 'Product updated.'})

        if request.method == 'DELETE':
            product.delete()
            return JsonResponse({'status': 'Product deleted.'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')
