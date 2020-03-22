require 'set'

def restore_numbers_on_circle(pairs)
  from_to = Hash.new { |h, k| h[k] = [] }
  to_from = Hash.new { |h, k| h[k] = [] }

  pairs.each do |pair|
    from, to = pair
    from_to[from] << to
    to_from[to] << from
  end

  first = pairs[0][0]
  circle = [first]
  considered = Set.new(circle)

  while circle.length < pairs.length
    if from_to[circle.last]
      from_to[circle.last].each do |to|
        if !considered.include?(to)
          considered.add(to)
          circle << to
          break
        end
      end
    else
      to_from[circle.last].each do |from|
        if !considered.include?(from)
          considered.add(from)
          circle << from
          break
        end
      end
    end
  end

  circle
end

puts restore_numbers_on_circle([[3, 5], [1, 4], [2, 4], [1, 5], [2, 3]])