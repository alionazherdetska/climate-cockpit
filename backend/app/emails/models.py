from django.core.mail import EmailMessage
from django.db import models
from django.template.loader import render_to_string
from django_extensions.db.models import TimeStampedModel


class Email(TimeStampedModel):
    template_name = "mail_base.html"

    to = models.EmailField("To")
    subject = models.CharField("Subject", max_length=200)
    content = models.TextField("Content")
    footer = models.TextField("Footer")
    compiled_template = models.TextField("compiled_template", blank=True)
    bcc = models.TextField("bcc", blank=True)
    is_sent = models.BooleanField("is_sent", default=False)

    def save(self, **kwargs):
        if not self.compiled_template:
            request = kwargs.pop("request")
            context = {
                "subject": self.subject,
                "content": self.content,
                "footer": self.footer,
            }
            self.compiled_template = render_to_string(
                self.template_name, context, request
            )
        super().save(**kwargs)

    def send(self):
        message = EmailMessage(
            subject=self.subject,
            body=self.compiled_template,
            to=self.to.split(","),
            bcc=self.bcc.split(","),
        )
        message.content_subtype = "html"
        message.send()
        self.is_sent = True
        self.save()

    def __str__(self):
        return f"{self.subject} to {self.to}"
