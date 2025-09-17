# This config is For example on Heroku
# You should add MIX_ENV=sample on heroku to use this config
use Mix.Config

config :ofEds, OfEds.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "ofEds-example.herokuapp.com", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE")

# Do not print debug messages in production
config :logger, level: :info

config :ofEds, OfEds.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: 8

config :ofEds, OfEds.User, jwt_secret: System.get_env("JWT_SECRET")
