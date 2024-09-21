from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
# from .products import products
from .models import Product,Order,ShippingAddress,OrderItem
from django.contrib.auth.models import User
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken,OrderSerializer,OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.hashers import  make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: dict[str, any]) -> dict[str, str]:
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
            
        print(data)

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    # print(data)
    try:
        user =User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={
            'detail':'User with this email already exists'
        }
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user= request.user
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if "password" in data and data['password'] !=' ':
        user.password = make_password(data['password'])
    
    user.save()
    serializer = UserSerializerWithToken(user,many= False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all() 
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all() 
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)


#ORDEER VIEWS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user= request.user
    data = request.data
    orderItems = data['orderItems']
    
    if orderItems and len(orderItems) ==0:
        return Response({
                         'details': 'No order items',
        },status= status.HTTP_400_BAD_REQUEST
                  )
    else:
        #create order
        order = Order.objects.create(
            user=user,
            payementMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
            # isPaid=data['isPaid'],
            # isDelevered=data['isDelevered']
        )
        #create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            shippingPrice=data['shippingPrice']
        )
        #create order items and set order tto orderItems relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                name=i['name'],
                qty=i['qty'],
                price=i['price'],
                order=order,
                image=product.image.url
            )
            product.countInStock -=int(i['qty'])
            product.save()
            
    serializer = OrderSerializer(order,many=False)
        #update stock
    return Response(serializer.data)