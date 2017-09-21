# == Schema Information
#
# Table name: appointments
#
#  id         :integer          not null, primary key
#  title      :string
#  start_time :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Appointment < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3 }
  validates :start_time, timeliness: { on_or_after: :now, type: :date }
end
