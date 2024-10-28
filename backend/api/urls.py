from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import index
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VendorListCreateView, VendorDetailView, MakeListCreateView, MakeDetailView,
    ModelListCreateView, ModelDetailView, StatusListCreateView, StatusDetailView,
    DepartmentListCreateView, DepartmentDetailView, EmployeeListCreateView, EmployeeDetailView,
    CategoryListCreateView, CategoryDetailView, AssetListCreateView, AssetDetailView,
    UserRegistrationView, UserProfileView
)



# from .views import (AssetViewSet,
                    # CategoryViewSet,
                    # VendorViewSet,
                    # MakeViewSet,
                    # ModelViewSet,
                    # StatusViewSet,
                    # DepartmentViewSet,
                    # EmployeeViewSet,
                    # AssetViewSet,)

# router = DefaultRouter()
# router.register(r'asset-categories', CategoryViewSet)
# router.register(r'asset-vendors', VendorViewSet)
# router.register(r'asset-makes', MakeViewSet)
# router.register(r'asset-models', ModelViewSet)
# router.register(r'asset-statuses', StatusViewSet)
# router.register(r'departments', DepartmentViewSet)
# router.register(r'employees', EmployeeViewSet)
# router.register(r'assets', AssetViewSet)



urlpatterns = [
    # path('api/', include(router.urls)),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('register/', UserRegistrationView.as_view(), name='user-registration'),
    # Asset URLs
    path('assets/', AssetListCreateView.as_view(), name='asset-list-create'),
    path('assets/<uuid:pk>/', AssetDetailView.as_view(), name='asset-detail'),
    # Employee URLs
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('employees/<uuid:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    
    path('', index, name='index'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api-token-auth/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    
    path('categories/', CategoryListCreateView.as_view(), name='Category-list-create'),
    path('categories/<uuid:pk>/', CategoryDetailView.as_view(), name='Category-detail'),
    
    # Vendor routes
    path('vendors/', VendorListCreateView.as_view(), name='vendor-list-create'),
    path('vendors/<int:pk>/', VendorDetailView.as_view(), name='vendor-detail'),
    # Make routes
    path('makes/', MakeListCreateView.as_view(), name='make-list-create'),
    path('makes/<int:pk>/', MakeDetailView.as_view(), name='make-detail'),
    # Model routes
    path('models/', ModelListCreateView.as_view(), name='model-list-create'),
    path('models/<int:pk>/', ModelDetailView.as_view(), name='model-detail'),
    # Status routes
    path('statuses/', StatusListCreateView.as_view(), name='status-list-create'),
    path('statuses/<int:pk>/', StatusDetailView.as_view(), name='status-detail'),
    # Department routes
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('departments/<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
]


