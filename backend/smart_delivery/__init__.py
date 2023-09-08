from smart_delivery.core.config import get_settings as _get_settings

_settings = _get_settings()

__title__ = _settings.APP_NAME
__summary__ = _settings.APP_SUMMARY

__version__ = _settings.APP_VERSION

__author__ = _settings.ADMIN_NAME
__email__ = _settings.ADMIN_EMAIL
