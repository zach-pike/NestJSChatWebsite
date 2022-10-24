# curl \
#   -X POST \
#   http://localhost:3000/auth/login \
#   -H 'Content-Type: application/json' \
#   --data "{\"username\":\"zach-test\", \"password\": \"8212\"}"

curl \
  -X POST \
  http://localhost:3000/auth/refresh \
  -H 'Content-Type: application/json' \
  --data "{ \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiTDA1dEUyeVJzYjQ0MDdFbDducVMiLCJpYXQiOjE2NjY2MjE0MTl9.JywXzX8-tBt6OevgvMLyLFDdTR1aNiSML-lQim5-IC8\" }"