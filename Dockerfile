FROM rabbitmq:3-management

RUN rabbitmq-plugins enable --offline rabbitmq_stomp
RUN rabbitmq-plugins enable --offline rabbitmq_web_stomp

EXPOSE 61613
EXPOSE 15672
EXPOSE 15674
