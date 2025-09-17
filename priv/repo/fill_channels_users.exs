import Ecto.Query, only: [from: 2]

users = OfEds.Repo.all OfEds.User

general = OfEds.Repo.get_by! OfEds.Channel, name: "general"
random = OfEds.Repo.get_by! OfEds.Channel, name: "random"

default_data = Enum.map users, fn(user) ->
  [{user.id, general.id, user.inserted_at},
   {user.id, random.id, user.inserted_at}]
end

join_data = OfEds.Repo.all(from m in OfEds.Message, group_by: [m.user_id, m.channel_id],
                            select: {m.user_id, m.channel_id, min(m.inserted_at)})
read_data = OfEds.Repo.all(from m in OfEds.Message, group_by: [m.user_id, m.channel_id],
                            select: {m.user_id, m.channel_id, max(m.inserted_at)})

join_data = [default_data, join_data] |> List.flatten |> Enum.uniq_by(fn {uid, cid, _} -> {uid, cid} end)
read_data = [read_data, default_data] |> List.flatten |> Enum.uniq_by(fn {uid, cid, _} -> {uid, cid} end)

Enum.each(join_data, fn {user_id, channel_id, inserted_at}->
  record = OfEds.Repo.get_by(OfEds.ChannelUser, user_id: user_id, channel_id: channel_id)
  if !record, do: OfEds.Repo.insert! %OfEds.ChannelUser{user_id: user_id, channel_id: channel_id, joined_at: inserted_at}
end)
Enum.each(read_data, fn {user_id, channel_id, inserted_at}->
  record = OfEds.Repo.get_by(OfEds.UserReadMessage, user_id: user_id, channel_id: channel_id)
  if !record, do: OfEds.Repo.insert! %OfEds.UserReadMessage{user_id: user_id, channel_id: channel_id, latest_ts: inserted_at}
end)
