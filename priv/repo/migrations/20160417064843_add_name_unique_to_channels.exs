defmodule OfEds.Repo.Migrations.AddNameUniqueToChannels do
  use Ecto.Migration

  def change do
    create unique_index(:channels, [:name])
  end
end
