from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, userName, is_admin=False, password=None, is_appAccess=False):
        """
        Creates and saves a User with the given email, name and password.
        """
       
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            userName=userName,
            is_admin=is_admin,
            is_appAccess =is_appAccess,
        )
        print("user", user)
       
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, userName, is_admin=True, password=None,is_appAccess=False):
        """
        Creates and saves a Superuser with the given email, name and password.
        """
      
        user = self.create_user(
            email=email,
            password=password,
            userName=userName,
            is_admin=is_admin,
            is_appAccess=is_appAccess
        )  
        print(user.id)
        #user.is_admin = True
        user.save(using=self._db)
        return user

# Custom User Model.
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    userName = models.CharField(max_length=255)
    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)
    is_appAccess=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['userName', 'is_admin' , 'is_appAccess']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.userName

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin