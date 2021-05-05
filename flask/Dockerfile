FROM python:3.9.5-alpine

WORKDIR /usr/src/app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
RUN mkdir -p static/uploads

EXPOSE 5000
ENTRYPOINT ["./gunicorn.sh"]