# frozen_string_literal: true

class AlternatingJournalsPrefController < ApplicationController
  before_action :require_login

  def update
    color = params[:color].to_s.strip
    unless color.match?(/\A#[0-9a-fA-F]{6}\z/)
      render json: { ok: false }, status: :unprocessable_entity and return
    end

    pref = User.current.pref
    others = (pref.others.presence || {}).to_h.stringify_keys
    others['alternating_journal_color'] = color
    pref.others = others
    pref.save!

    render json: { ok: true }
  end
end
