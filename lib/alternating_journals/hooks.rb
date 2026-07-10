# frozen_string_literal: true

module AlternatingJournals
  class Hooks < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(context = {})
      controller = context[:controller]
      is_issue_show = controller.is_a?(IssuesController) && controller.action_name == 'show'
      is_my_account = controller.is_a?(MyController) && controller.action_name == 'account'
      return unless is_issue_show || is_my_account

      html = stylesheet_link_tag('alternating_journals', plugin: 'redmine_alternating_journals') +
             javascript_include_tag('alternating_journals', plugin: 'redmine_alternating_journals')

      if is_issue_show
        color = journal_color_for(User.current)
        r, g, b = color[1..2].to_i(16), color[3..4].to_i(16), color[5..6].to_i(16)
        html += "<style>body #history .journal-content.journal-alt{background-color:rgba(#{r},#{g},#{b},0.30)!important}</style>".html_safe
      end

      html
    end

    def view_my_account(context = {})
      color = journal_color_for(context[:user])
      <<~HTML.html_safe
        <p>
          <label for="aj-color-picker">#{l(:label_aj_journal_color)}</label>
          <input type="color" id="aj-color-picker" value="#{ERB::Util.html_escape(color)}">
          <span id="aj-save-status" style="margin-left:6px;font-size:0.9em;color:#555"></span>
        </p>
      HTML
    end

    private

    def journal_color_for(user)
      default = '#add8e6'
      return default unless user&.logged?

      color = user.pref['alternating_journal_color'].to_s.strip
      color.match?(/\A#[0-9a-fA-F]{6}\z/) ? color : default
    end
  end
end
