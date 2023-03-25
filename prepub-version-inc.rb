path_pkg = 'package.json'
path_pkg__otter_wp = 'otter-plugin/otter-wp/package.json'


def increment(version)
  arr = version.split(".")
  value_to_inc = arr.pop.to_i + 1
  arr.push(value_to_inc).join(".")
end


def get_pkg_version(filename)
  File.read(filename)
    .match(/"version":\s*"([\d\.]+)"/)
    .captures[0]
end


def write_pkg_version(filename, version)
  s = File.read(filename).sub(/"version":\s*"[\d\.]+"/, "\"version\": \"#{version}\"")
  File.write(filename, s)
end


version = get_pkg_version(path_pkg)
new_version = increment(version)
print "Incrementing version from #{version} to #{new_version}..."

write_pkg_version(path_pkg, new_version)
puts "  ✔︎"

