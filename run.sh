del_stopped(){
  local name=$1
  local state
  state=$(docker inspect --format "{{.State.Running}}" "$name" 2>/dev/null)

  if [[ "$state" == "false" ]]; then
    docker rm "$name"
  fi
}

del_stopped eva-rabbit

docker run -d \
   -p 61613:61613 \
   -p 15672:15672 \
   -p 15674:15673 \
   --hostname my-rabbit \
   --name eva-rabbit \
   nsa/rabbitwebstomp

