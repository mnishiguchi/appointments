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

FactoryGirl.define do
  factory :appointment do
    title "MyString"
    start_time "2017-09-20 18:01:17"
  end
end
