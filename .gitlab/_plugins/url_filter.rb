require 'nokogiri'

Jekyll::Hooks.register :pages, :post_render do |page|
    puts "Running URL filter for page: #{page.url}"
    site_baseurl = page.site.baseurl
    next if site_baseurl.empty?

    doc = Nokogiri::HTML(page.output)
    doc.css('a').each do |link|
        href = link['href']
        next unless href.start_with?('/')
        next if href.start_with?("#{site_baseurl}/")

        link['href'] = "#{site_baseurl}#{href}"
    end

    page.output = doc.to_html
end