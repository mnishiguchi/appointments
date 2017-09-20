class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.order(:start_time)
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(appointment_params)

    if @appointment.save
      flash[:notice] = "An appointment was successfully created"
      redirect_to appointments_url
    else
      flash.now[:alert] = "Couldn't create an appointment"
      render :index
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:title, :start_time)
  end
end
