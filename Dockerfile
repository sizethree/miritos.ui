FROM ubuntu:12.04

RUN apt-get update
RUN apt-get install -y nginx zip curl
COPY ./auto/docker/proxy.sh /usr/sbin/proxy

EXPOSE 80

CMD ["/usr/sbin/proxy"]
