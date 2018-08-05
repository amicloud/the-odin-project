def bubble_sort(array)
  arr = array.clone
  until sorted? arr
    arr.each_index do |i|
      if i < arr.length - 1 && arr[i] > arr[i + 1]
        temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      end
    end
  end
  p arr
end

def bubble_sort_by(array)
  arr = array.clone
  until sorted? arr
    arr.each_index do |i|
      break if i >= arr.length - 1
      if block_given? ? yield(arr[i], arr[i + 1]) : arr[i] > arr[i + 1]
        temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      end
    end
  end
  p arr
end

def sorted?(array)
  array.each_with_index do |element, i|
    return true if i == array.length - 1
    return false if element > array[i + 1]
  end
  true
end