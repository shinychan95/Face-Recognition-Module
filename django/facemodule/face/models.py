# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Post(models.Model):
	profile_pic = models.ImageField(upload_to="blog/profile_pic")
	# 저장경로 : MEDIA_ROOT/blog/profile_pic/xxxx.jpg 경로에 저장
	# DB필드 : 'MEDIA_URL/blog/profile_pic/xxxx.jpg' 문자열 저장

	photo = models.ImageField(blank=True, upload_to="blog/%Y/%m/%d")
	# 저장경로 : MEDIA_ROOT/blog/2017/05/10/xxxx.jpg 경로에 저장
	# DB필드 : 'MEDIA_URL/blog/2017/05/10/xxxx.jpg' 문자열 저장
