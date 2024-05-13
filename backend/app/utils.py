import secrets
import string


def code_generator(length=5, characters=string.digits):
    """Generate a random code."""
    return "".join(secrets.choice(characters) for _ in range(length))


def generate_aggregate(queryset, field, default=0):
    return queryset.aggregate(result=field)["result"] or default
