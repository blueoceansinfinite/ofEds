defmodule OfEds.Repo.Migrations.AddTypeToChannels do
  use Ecto.Migration

  def up do
    alter table(:channels) do
      add :type, :integer
    end
    flush()
    OfEds.Repo.update_all("channels", set: [type: 1])
    alter table(:channels) do
      modify :type, :integer, null: false
    end
  end

  def down do
    alter table(:channels) do
      remove :type
    end
  end
end
